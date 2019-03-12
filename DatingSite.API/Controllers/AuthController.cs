using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingSite.API.Data;
using DatingSite.API.DTOS;
using DatingSite.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingSite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO ufr)
        {
            ufr.Username = ufr.Username.ToLower();
            if (await _repo.UserExists(ufr.Username))
            {
                return BadRequest("User Already Exist");
            }
            var userToCreate = new User
            {
                Username = ufr.Username
            };
            var createduser = await _repo.Register(userToCreate, ufr.Password);
            //TODO : return CreatedAtRoute()
            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDTO ufl)
        {
            //Check The User
            var userFromDto = await _repo.Login(ufl.Username.ToLower(), ufl.Password);
            if (userFromDto == null) { return Unauthorized(); }
            //Claims for token
            //in this project is ID and UserName
            var Claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier,userFromDto.Id.ToString()),
            new Claim(ClaimTypes.Name, userFromDto.Username)
            };

            //Create a key for Signin in Server
            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            //Signin the Key with Hash Algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Create Token
            var tokenDiscriptor = new SecurityTokenDescriptor
            {
                //Pass our Claims
                Subject = new ClaimsIdentity(Claims),
                //Expires Date
                Expires = DateTime.Now.AddDays(1),
                //Pass Signing Credentials by Server
                SigningCredentials = creds
            };

            //Create Token with JWT
            var token = new JwtSecurityTokenHandler().CreateToken(tokenDiscriptor);
            
            //Return the Token
            return base.Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}
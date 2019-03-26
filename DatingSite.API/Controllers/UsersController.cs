using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingSite.API.Data;
using DatingSite.API.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingSite.API.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly IDatingRepository _repo;
    private readonly IMapper _mapper;
    public UsersController(IDatingRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;

    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      var users = await _repo.GetUsers();
      var userstoreturn = _mapper.Map<IEnumerable<UserForList>>(users);
      return Ok(userstoreturn);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
      var users = await _repo.GetUser(id);
      var usertoreturn = _mapper.Map<UserForDetailed>(users);
      return Ok(usertoreturn);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userdto)
    {
      if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
      {
        return Unauthorized();
      }
      var userFromrepo = await _repo.GetUser(id);
      _mapper.Map(userdto, userFromrepo);

      if (await _repo.SaveAll())
      {
        return NoContent();
      }

      throw new Exception($"Updating user {id}.failed on save");
    }

  }
}
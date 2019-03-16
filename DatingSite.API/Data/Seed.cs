using System;
using System.Collections.Generic;
using DatingSite.API.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DatingSite.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }

        public void seedusers()
        {
            var userdata = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userdata);
            foreach (var user in users)
            {
                byte[] passwordhash,passwordsalt;
                CreatePasswordHash("123456",out passwordhash,out passwordsalt);

                user.Passwordsalt = passwordsalt;
                user.Passwordshash = passwordhash;
                user.Username = user.Username.ToLower();
                
                _context.User.Add(user);
            }
            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}
using System;
using System.Linq;
using System.Threading.Tasks;
using DatingSite.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingSite.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        public DataContext _context { get; set; }
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string username, string Password)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null) { return null; }
            if (!VerifyPasswordHash(Password, user.Passwordsalt, user.Passwordshash)) { return null; }

            return user;


        }

        private bool VerifyPasswordHash(string password, byte[] passwordsalt, byte[] passwordshash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordsalt))
            {
                var Computehash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < Computehash.Length; i++)
                {
                    if (Computehash[i] != passwordshash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        public async Task<User> Register(User user, string Password)
        {
            byte[] PasswordHash, PasswordSalt;
            CreatPasswordHash(Password, out PasswordHash, out PasswordSalt);
            user.Passwordsalt = PasswordSalt;
            user.Passwordshash = PasswordHash;

            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.User.AnyAsync(x => x.Username == username))
            {
                return true;
            }
            return false;
        }
    }
}
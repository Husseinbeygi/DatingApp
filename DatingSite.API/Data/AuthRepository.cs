using System;
using System.Threading.Tasks;
using DatingSite.API.Models;

namespace DatingSite.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        public DataContext _context { get; set; }
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public Task<User> Login(string username, string Password)
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> Register(User user, string Password)
        {
            byte[] PasswordHash,PasswordSalt;
            CreatPasswordHash(Password,out PasswordHash,out PasswordSalt);
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

        public Task<bool> UserExists(string username)
        {
            throw new System.NotImplementedException();
        }
    }
}
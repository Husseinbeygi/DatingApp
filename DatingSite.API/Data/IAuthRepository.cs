using System.Threading.Tasks;
using DatingSite.API.Models;

namespace DatingSite.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string Password);
        Task<User> Login(string username, string Password);
        Task<bool> UserExists(string username);
    }
}
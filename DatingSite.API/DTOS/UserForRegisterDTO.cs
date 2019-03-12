using System.ComponentModel.DataAnnotations;

namespace DatingSite.API.DTOS
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(60,MinimumLength = 3,ErrorMessage = "minimum lenth is 4")]
        public string Password { get; set; }
    }
}
namespace DatingSite.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] Passwordshash { get; set; }
        public byte[] Passwordsalt { get; set; }

    }
}
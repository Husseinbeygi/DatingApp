using System;
using Microsoft.AspNetCore.Http;

namespace DatingSite.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int AgeClac(this DateTime DateofBirth)
        {
            var age = DateTime.Today.Year - DateofBirth.Year;
            if (DateofBirth.AddYears(age) > DateTime.Today)
                age--;

            return age;
        }
    }
}
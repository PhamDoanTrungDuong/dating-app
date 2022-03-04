using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public Collection<AppUserRole> UsersRole { get; set; }

    }
}
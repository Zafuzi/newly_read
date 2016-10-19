﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace Newly_Read.Models {
    public class IdentityModel {
        public class ApplicationUser : IdentityUser {
        }
        public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {
            public ApplicationDbContext() : base("DefaultConnection") {
            }
        }
    }
}
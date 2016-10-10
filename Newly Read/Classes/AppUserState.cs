using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static Newly_Read.Models.IdentityModel;

namespace Newly_Read {

    public class AppUserState {
        public string Name = string.Empty;
        public string Email = string.Empty;
        public string UserId = string.Empty;
        public bool IsAdmin = false;


        /// <summary>
        /// Exports a short string list of Id, Email, Name separated by |
        /// </summary>
        /// <returns></returns>
        public override string ToString() {
            return string.Join("|", new string[] { this.UserId, this.Name, this.IsAdmin.ToString()});
        }


        /// <summary>
        /// Imports Id, Email and Name from a | separated string
        /// </summary>
        /// <param name="itemString"></param>
        public bool FromString(string itemString) {
            if (string.IsNullOrEmpty(itemString))
                return false;

            string[] strings = itemString.Split('|');
            if (strings.Length < 3)
                return false;

            UserId = strings[0];
            Name = strings[1];
            IsAdmin = strings[2] == "True";

            return true;
        }

        /// <summary>
        /// Determines if the user is logged in
        /// </summary>
        /// <returns></returns>
        public bool IsEmpty() {
            if (string.IsNullOrEmpty(this.UserId) || string.IsNullOrEmpty(this.Name))
                return true;

            return false;
        }
    }
}
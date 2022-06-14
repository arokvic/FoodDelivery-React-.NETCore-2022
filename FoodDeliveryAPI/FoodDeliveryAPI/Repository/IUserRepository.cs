using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
    public interface IUserRepository
    {
        //Task<User> GetByUsername(string username);

        User GetByUsername(string username);

        public List<User> GetUnverifiedDeliverers();

        public List<User> GetVerifiedDeliverers();

        void AddUser(User user);

        void UpdateUser(User user);

        void VerifyUser(string username, string state);

        bool UserExists(string username);

        
    }
}

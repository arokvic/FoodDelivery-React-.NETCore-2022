using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodDeliveryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DeliveryContext _context;

        public UserRepository(DeliveryContext context)
        {
            _context = context;
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public User GetByUsername(string username)
        {
            return _context.Users.Where(i => i.Username == username).FirstOrDefault();
        }

        public List<User> GetUnverifiedDeliverers()
        {
            return _context.Users.Where(i => i.Role == (UserType.DELIVERER).ToString() && i.Verified == (UserState.PENDING).ToString()).ToList();
        }

        public List<User> GetVerifiedDeliverers()
        {
            return _context.Users.Where(i => i.Role == (UserType.DELIVERER).ToString() && (i.Verified == (UserState.CONFIRMED).ToString() || i.Verified == UserState.DECLINED.ToString())).ToList();
        }

        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public bool UserExists(string username)
        {
            return _context.Users.Any(e => e.Username == username);
        }

        public void VerifyUser(string username, string state)
        {           
            User user = GetByUsername(username);
            user.Verified = state;

            UpdateUser(user);
        }
    }
}

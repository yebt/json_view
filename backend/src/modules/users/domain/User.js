class User {
    constructor(id, username, email, passwordHash) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.passwordHash = passwordHash;
    }
  
    // Additional methods or validations can be added here
  
    toJSON() {
      // Convert the user object to a JSON representation for serialization
      return {
        id: this.id,
        username: this.username,
        email: this.email,
        // Omit passwordHash in the JSON representation for security reasons
      };
    }
  }
  
  module.exports = User;

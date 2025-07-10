export class User {
  constructor({ first_name, last_name, email, id = null }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.created_at = new Date().toISOString();
  }

  // Validation method
  static validate(userData) {
    const errors = [];

    if (!userData.first_name || userData.first_name.trim() === "") {
      errors.push("First name is required");
    }

    if (!userData.last_name || userData.last_name.trim() === "") {
      errors.push("Last name is required");
    }

    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push("Valid email is required");
    }

    return errors;
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default User;

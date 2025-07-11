/**
 * User class for managing user data and validation
 * @class User
 */
export class User {
  /**
   * Creates a new User instance
   * @constructor
   * @param {Object} userData - User data object
   * @param {string} userData.first_name - User's first name
   * @param {string} userData.last_name - User's last name
   * @param {string} userData.email - User's email address
   * @param {string|null} [userData.id=null] - User's unique identifier
   * @example
   * const user = new User({
   *   first_name: "John",
   *   last_name: "Doe",
   *   email: "john.doe@example.com",
   *   id: "123e4567-e89b-12d3-a456-426614174000"
   * });
   */
  constructor({ first_name, last_name, email, id = null }) {
    /**
     * User's unique identifier
     * @type {string|null}
     */
    this.id = id;

    /**
     * User's first name
     * @type {string}
     */
    this.first_name = first_name;

    /**
     * User's last name
     * @type {string}
     */
    this.last_name = last_name;

    /**
     * User's email address
     * @type {string}
     */
    this.email = email;

    /**
     * Timestamp when the user was created
     * @type {string}
     */
    this.created_at = new Date().toISOString();
  }

  /**
   * Validates user data against required fields and formats
   * @static
   * @param {Object} userData - User data to validate
   * @param {string} userData.first_name - User's first name
   * @param {string} userData.last_name - User's last name
   * @param {string} userData.email - User's email address
   * @returns {string[]} Array of validation error messages (empty if valid)
   * @example
   * const errors = User.validate({
   *   first_name: "John",
   *   last_name: "Doe",
   *   email: "john.doe@example.com"
   * });
   * if (errors.length > 0) {
   *   console.log("Validation errors:", errors);
   * }
   */
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

  /**
   * Validates email format using regex pattern
   * @static
   * @param {string} email - Email address to validate
   * @returns {boolean} True if email format is valid, false otherwise
   * @example
   * const isValid = User.isValidEmail("john.doe@example.com"); // true
   * const isInvalid = User.isValidEmail("invalid-email"); // false
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default User;

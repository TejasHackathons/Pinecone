const validPhoneNumber = (phoneNumber) => {
  return phoneNumber.length == 10 && parseInt(phoneNumber);
};

module.exports = validPhoneNumber;

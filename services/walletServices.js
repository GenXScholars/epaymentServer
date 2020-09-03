const axios = require("axios").default;
const jwt = require("jsonwebtoken");
const config = require("../config/constants");
const Wallet = require("../models/walletModel");
const apiUrl = "https://sandbox.wallets.africa"; // to be changed for production
module.exports = {
  creatWallet,
  verifyBvn,
  setWalletPin,
  setWalletPassword,
  getWalletTransactions,
  getAWalletById,
  getWalletBalance,
  getAllWallets,
  getAllWalletsFromDatabase,
  chargeWallet,
  creditWallet,
  transferFromWalletToBank,
  // delete: _delete
};

//axios config
const publickey = "uvjqzm5xl6bw";
const axiosCall = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${publickey}`,
   
  }
});



async function creatWallet(passedBodyParams) {

  if(!passedBodyParams.firstname){
    throw "firstname is required";
  }

  if(!passedBodyParams.lastname){
    throw "lastname is required";
  }

  if(!passedBodyParams.email){
    throw "Please enter an email";
  }

  if(!passedBodyParams.DOB){
    throw "you must provide your date of birth";
  }

  if(passedBodyParams) {
    const { firstname, lastname, email, DOB, currency } = passedBodyParams;
     return await axiosCall.post(`/wallet/generate`, {
      "firstName": firstname,
      "lastName": lastname,
      "email": email,
      "SecretKey": "hfucj5jatq8h",
      "dateOfBirth": DOB,
      "currency": currency,
    })
  }
  
}

async function verifyBvn(passedBodyParams) {
  // if(!passedBodyParams.BVN && (passedBodyParams.BVN.length != 10)){
  //   throw "you must enter a valid bvn"
  // }
  if(!passedBodyParams){
    const { BVN, DOB } = passedBodyParams;
    return await axiosCall.post(`/wallet/verifybvn`, {

      // the below is for testing the api endpoit
      "dateOfBirth": "14-04-1992",
      "bvn": "22231485915",
      "phoneNumber": "08057998539",
      "secretKey": "hfucj5jatq8h"      

      //  code below for production standard
      // "secretKey": "hfucj5jatq8h",
      // "bvn": BVN,
      // "dateOfBirth": DOB // format "14-04-1992",
    })
  }
}


// to retrieve wallest stored in local db

async function getAllWalletsFromDatabase(){
    return await Wallet.find();
}

async function getAllWallets(passedBodyParams) {
  // if(!passedBodyParams.secretKey){
  //   throw "you are not authorize to acess this page"
  // }
    const secretekey = passedBodyParams.secret;
    return await axiosCall.post(`/self/users`, {
      "secretKey": "hfucj5jatq8h",
    })
  
  
}
// async function generateAcctNumber(passedBodyParams) {
//   if(!passedBodyParams.phoneNumber) {
//     throw "You must provide a phone number"
//   }
//   const { phoneNumber } = passedBodyParams;
//     return await axiosCall.post(`/wallet/generateaccountnumber`, {
//       "phoneNumber": phoneNumber,
//       "secretKey": "hfucj5jatq8h",
//     })
// }

async function setWalletPin(passedBodyParams) {
  if(!passedBodyParams.phoneNumber){
    throw "You must enter a phone number"
  }
  if(!passedBodyParams.transactionPin){
    throw "You must enter a pin for your wallet"
  }

  if(passedBodyParams){
    const { phoneNumber, transactionPin } = passedBodyParams;
    return await axiosCall.post(`/wallet/pin`, {
      "phoneNumber": phoneNumber,
      "transactionPin": transactionPin,
      secretKey: "hfucj5jatq8h",
    })
  }
   
}

async function setWalletPassword(passedBodyParams) {
  if(!passedBodyParams.password){
   throw " you must set a password for your wallet to continue"
  }

  if(!passedBodyParams.phoneNumber){
    throw " you must enter a phone number attached to the wallet"
   }
  
   if(passedBodyParams){
     const { phoneNumber, password } = passedBodyParams;
    return await axiosCall.post(`/wallet/password`, {
      "phoneNumber": phoneNumber,
      "password": password,
      "secretKey": "hfucj5jatq8h",
    })
   }
    

}

async function getWalletTransactions(passedBodyParams) {
   if(!passedBodyParams.skip && !passedBodyParams.take && !passedBodyParams.dateFrom && !passedBodyParams.dateTO && !passedBodyParams.transactionType){
     throw "Please fill in all required parameters"
   }

   if(!passedBodyParams.transactionPin && !passedBodyParams.phoneNumber){
     throw " transaction pin or phone number missing"
   }

  if(!passedBodyParams.currency){
    throw " you must set a curreny"
  }

  if(passedBodyParams){
    const { skip, take, dateFrom, dateTO, transactionType, phoneNumber, transactionPin, currency } = passedBodyParams;
    return await axiosCasll.post(`/wallet/transactions`, {
      "skip": skip, // type of number
      "take": take, // type of number
      "dateFrom": dateFrom,  // date format "2020-01-15",
      "dateTo": dateTO, // date format"2020-01-15",
      "transactionType": transactionType, // mustbe of type number
      "phoneNumber": phoneNumber,
      "transactionPin": transactionPin,
      "currency": currency,
      "secretKey": "hfucj5jatq8h",
    })
  }
   
}

async function getAWalletById(passedBodyParams) {
  if(!passedBodyParams.phoneNumber){
    throw "you must enter a phone number"
  }
  
  if(passedBodyParams){
    const { phoneNumber } = passedBodyParams;
    return await axiosCall.post(`/wallet/getuser`, {
      "phoneNumber": phoneNumber ,
      "secretKey": "hfucj5jatq8h",
    })
  }

}

async function getWalletBalance(passedBodyParams) {
  if(!passedBodyParams.phoneNumber){
    throw "you must enter a phone number "
  }
  if(!passedBodyParams.transactionPin){
    throw "you must enter a transaction pin "
  }
  if(!passedBodyParams.transactionPin){
    throw "you must enter a transaction pin "
  }
  if(!passedBodyParams.currency){
    throw "you must enter a currency "
  }

  if(passedBodyParams){
    const { phoneNumber, transactionPin, currency } = passedBodyParams;
    return await axiosCall.post(`/wallet/balance`, {
      "phoneNumber": phoneNumber,
      "transactionPin": transactionPin ,
      "currency": currency,
      "secretKey": "hfucj5jatq8h",
    })
  }
    
}

// transfer api
async function chargeWallet(passedBodyParams) {
  if(!passedBodyParams.amount && (typeof(amount) == -Infinity)){
    throw " you must enter a valid amount "
  }

  if(!passedBodyParams.phoneNumber){
    throw "you must enter a phone number for this wallet"
  }

  if(passedBodyParams){
    return axiosCall.post(`/wallet/debit`, {
      "transactionReference": Math.floor(Math.random() * 5566), //temporary id ..to be dynamic
      "amount": passedBodyParams.amount,
      "phoneNumber": passedBodyParams.phoneNumber,
      "secretKey": "hfucj5jatq8h", // this is constant
    })
  } 
}

async function transferFromWalletToBank(passedBodyParams) {
  if(!passedBodyParams.BankCode){
    throw "name of bank missing"
  }

  if(!passedBodyParams.AccountNumber){
    throw "please provide a valid account number"
  }

  if(!passedBodyParams.AccountName){
    throw "please provide an account name"
  }

  if(!passedBodyParams.Narration){
    throw "please enter a reason for this transaction"
  }

  if(!passedBodyParams.Amount){
    throw "Amount to be transferred is missing"
  }

  if(tyepof(passedBodyParams.Amount) === -Infinity){
    throw "you must enter a positive number"
  }

  if(passedBodyParams){
    const { BankCode, AccountNumber, AccountName, Amount, Narration } = passedBodyParams;
    return axiosCall.post(`/transfer/bank/account`, {
      "SecretKey": "hfucj5jatq8h",
      "BankCode": BankCode,
      "AccountNumber": AccountNumber,
      "AccountName": AccountName,
      "TransactionReference": Math.floor(Math.random() * 5565566),
      "Amount": Amount,
      "Narration": Narration
    })
  }
    
}

async function creditWallet(passedBodyParams) {
  if(!passedBodyParams.amount){
    throw "you must enter a valid amount"
  }
  if(typeof(passedBodyParams.amount) === -Infinity){
    throw "you cannit enter a negative number"
  }

  if(!passedBodyParams.phoneNumber){
    throw "you must enter a valid phone number"
  }

  if(passedBodyParams){
    const { amount, phoneNumber } = passedBodyParams;
    return await axiosCall.post(`/wallet/credit`, {
      "transactionReference":Math.floor(Math.random() * 5565566),
      "amount": amount,
      "phoneNumber": phoneNumber,
      "secretKey": "hfucj5jatq8h"
    })
  }
    
}
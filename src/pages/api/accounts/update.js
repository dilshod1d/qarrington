import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import { check, validate } from '@lib/validations';
import { createCustomAccount, createStripeImage } from '@lib/stripe';
import { getAccountCompletionRate } from '@helpers/accounts-helpers';
import { getCurrentUserId } from '@lib/auth';
import { protectRoute } from '@lib/protectRoute';

const validations = [
  check('accountAccessKey').optional().isLength({ min: 12, max: 12 }).withMessage('Invalid access key, it has to be at least 12 chars long'),
  check('accountIdNumber').optional().isNumeric().withMessage('Account Id is not a number'),
  check('accountIbanNumber').optional().isNumeric().withMessage('accountIbanNumber is not a number'),
  check('accountNumber').optional().isNumeric().withMessage('accountNumber is not a number'),
  check('accountRoutingNumber').optional().isNumeric().withMessage('accountRoutingNumber is not a number'),
  check('accountHomeCountry').optional().isLength({ min: 2, max: 2 }).withMessage('Account home country is not valid'),
  check('accountBusinessCountry').optional().isLength({ min: 2, max: 2 }).withMessage('accountBusinessCountry is not valid'),
  check('accountEmailAddress').optional().isEmail().withMessage('accountEmailAddress is not a proper email address'),
  check('accountBusinessEmail').optional().isEmail().withMessage('accountBusinessEmail is not a proper email address')
];

const formatReqObject = (req) => {
  const schema = {
    accountPersonal: ['accountFirstName', 'accountLastName', 'accountIdNumber', 'accountBirthDate', 'accountHomeCountry'],
    accountBusiness: [
      'accountBusinessName',
      'accountBusinessType',
      'accountBusinessIndustry',
      'accountBusinessWebsite',
      'accountBusinessAddress',
      'accountBusinessCountry',
      'accountBusinessEmail'
    ],
    accountBank: ['accountBankCountry', 'accountBankCurrency', 'accountIbanNumber', 'accountNumber', 'accountRoutingNumber', 'accountSortCode'],
    accountContact: ['accountEmailAddress', 'accountPhoneNumber', 'accountHomeAddress', 'accountZipCode', 'accountCityName', 'accountStateName'],
    accountProfile: ['accountAvatarUrl', 'accountCurrentTitle'],
    accountKeys: ['accountAccessKey']
  };
  const data = {};

  Object.keys(schema).forEach((key) => {
    if (typeof schema[key] == 'object' && schema[key][0]) {
      data[key] = {};
      schema[key].forEach((keyValue) => {
        if (req.body[keyValue] && req.body[keyValue] != null) {
          data[key][keyValue] = req.body[keyValue];
        }
      });
      if (Object.entries(data[key]) < 1) {
        delete data[key];
      }
    } else {
      if (req.body[key]) data[key] = req.body[key];
    }
  });

  return data;
};

const createStripeAccount = async (req, account, front) => {
  const email = account.accountBusiness.accountBusinessEmail || account.accountContact.accountEmailAddress;
  const country = account.accountBusiness.accountBusinessCountry || account.accountPersonal.accountHomeCountry;
  const dob = {
    day: account.accountPersonal.accountBirthDate.split('-')[1],
    month: account.accountPersonal.accountBirthDate.split('-')[0],
    year: account.accountPersonal.accountBirthDate.split('-')[2]
  };

  const individualAddres = {
    line1: account.accountContact.accountHomeAddress || account.accountBusiness.accountBusinessAddress,
    postal_code: account.accountContact.accountZipCode,
    city: account.accountContact.accountCityName,
    state: account.accountContact.accountStateName
  };

  const companyAddress = {
    line1: account.accountBusiness.accountBusinessAddress || account.accountContact.accountHomeAddress,
    country: account.accountBusiness.accountBusinessCountry || account.accountPersonal.accountHomeCountry
  };
  const data = {
    type: 'custom',
    country,
    business_type: 'individual',
    business_profile: {
      url: account.accountBusiness.accountBusinessWebsite,
      mcc: '5734'
    },
    company: {
      address: companyAddress,
      name: account.accountBusiness.accountBusinessName || account.accountPersonal.accountFirstName + ' ' + account.accountPersonal.accountLastName
    },
    individual: {
      first_name: account.accountPersonal?.accountFirstName,
      last_name: account.accountPersonal?.accountLastName,
      dob,
      address: individualAddres,
      email,
      phone: account.accountContact?.accountPhoneNumber,
      id_number: account.accountPersonal?.accountIdNumber,
      verification: {
        document: {
          front: front.id
        }
      }
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true }
    },
    tos_acceptance: {
      ip: req.connection.remoteAddress,
      date: Math.floor(Date.now() / 1000)
    },
    external_account: {
      object: 'bank_account',
      country: account.accountBank.accountBankCountry,
      currency: account.accountBank.accountBankCurrency,
      routing_number: account.accountBank.accountRoutingNumber,
      account_number: account.accountBank.accountNumber
    },
    default_currency: account.accountBank?.accountBankCurrency
  };

  const stripeAccount = await createCustomAccount(data);
  return stripeAccount;
};

const createStripeAccountForNonUS = async (req, account, front) => {
  const email = account.accountBusiness.accountBusinessEmail || account.accountContact.accountEmailAddress;
  const country = account.accountBusiness.accountBusinessCountry || account.accountPersonal.accountHomeCountry;
  const dob = {
    day: account.accountPersonal.accountBirthDate.split('-')[1],
    month: account.accountPersonal.accountBirthDate.split('-')[0],
    year: account.accountPersonal.accountBirthDate.split('-')[2]
  };

  const individualAddres = {
    line1: account.accountContact.accountHomeAddress || account.accountBusiness.accountBusinessAddress,
    postal_code: account.accountContact.accountZipCode,
    city: account.accountContact.accountCityName,
    state: account.accountContact.accountStateName
  };

  const companyAddress = {
    line1: account.accountBusiness.accountBusinessAddress || account.accountContact.accountHomeAddress,
    country: account.accountBusiness.accountBusinessCountry || account.accountPersonal.accountHomeCountry
  };

  const data = {
    type: 'custom',
    country,
    business_type: 'individual',
    business_profile: {
      url: account.accountBusiness.accountBusinessWebsite,
      mcc: '5734'
    },
    company: {
      address: companyAddress,
      name: account.accountBusiness.accountBusinessName || account.accountPersonal.accountFirstName + ' ' + account.accountPersonal.accountLastName
    },
    individual: {
      first_name: account.accountPersonal?.accountFirstName,
      last_name: account.accountPersonal?.accountLastName,
      dob,
      address: individualAddres,
      email,
      phone: account.accountContact?.accountPhoneNumber,
      id_number: account.accountPersonal?.accountIdNumber,
      verification: {
        document: {
          front: front.id
        }
      }
    },
    capabilities: {
      transfers: { requested: true }
    },
    tos_acceptance: {
      ip: req.connection.remoteAddress,
      date: Math.floor(Date.now() / 1000)
    },
    external_account: {
      object: 'bank_account',
      country: account.accountBank.accountBankCountry,
      currency: account.accountBank.accountBankCurrency,
      routing_number: account.accountBank.accountRoutingNumber,
      account_number: account.accountBank.accountNumber
    },
    default_currency: account.accountBank?.accountBankCurrency,
    settings: {
      payouts: {
        schedule: {
          interval: 'manual'
        },
        statement_descriptor: 'SUBSCRIPTIONS'
      }
    },
    metadata: {
      integration_check: 'accept_a_payment',
      bank_name: account.accountBank?.accountBankName,
      recipient_name: account.accountPersonal?.accountFirstName + ' ' + account.accountPersonal?.accountLastName
    }
  };

  const stripeAccount = await createCustomAccount(data);
  return stripeAccount;
};

const canCreateStripeAccount = (account, id) => {
  if (account.accountStatus.accountCompletionRate < 80 || account.accountStripeId || !id) return false;
  if (
    (account.accountBusiness.accountBusinessAddress || account.accountContact.accountHomeAddress) && // Has address
    (account.accountBusiness.accountBusinessEmail || account.accountContact.accountEmailAddress) && // Has email
    (account.accountBusiness.accountBusinessCountry || account.accountPersonal.accountHomeCountry) && // Has couentry
    account.accountPersonal.accountBirthDate && // Has birthdate
    account.accountContact.accountZipCode &&
    account.accountContact.accountCityName &&
    account.accountContact.accountStateName && // Has personal address data
    account.accountPersonal.accountFirstName &&
    account.accountPersonal.accountLastName && // Has first and last name
    account.accountPersonal.accountIdNumber && // Has id
    account.accountContact.accountPhoneNumber && // Has phone number
    account.accountBank.accountBankCountry &&
    account.accountBank.accountBankCurrency &&
    account.accountBank.accountRoutingNumber &&
    account.accountBank.accountNumber // Has bank data
  )
    return true;
};

const isAccountUSABased = (account) => (account.accountBank.accountBankCountry === 'US' ? true : false);

export default async function handler(req, res) {
  // await protectRoute(req, res, () => {});
  await dbConnect();

  if (req.method === 'PUT') {
    await validate(validations, req, res);
    try {
      const id = await getCurrentUserId(req);
      if (!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' });

      const formdata = formatReqObject(req);
      const account = await Account.findByIdAndUpdate(id, [{ $set: formdata }], { new: true });

      const completionRate = getAccountCompletionRate(account);
      account.accountStatus.accountCompletionRate = completionRate;
      account.accountIsUpdatedAt = Date.now();

      if (canCreateStripeAccount(account, req.body.accountGovernmentId)) {
        const front = await createStripeImage(req.body.accountGovernmentId);
        if (front?.error) return res.status(400).json({ success: false, message: 'Failed to load account government ID image', error: front.error });

        const acc = isAccountUSABased(account)
          ? await createStripeAccount(req, account, front)
          : await createStripeAccountForNonUS(req, account, front);
        if (acc?.error) return res.status(400).json({ success: false, message: 'Failed to create Stripe account', error: acc.error });
        account.accountStripeId = acc.id;
        account.accountStatus.accountIsVerified = true;

        await account.save();
        return res.status(201).json({ success: true, data: account, message: 'Stripe account created successfully' });
      }

      const updatedAccount = await account.save();
      console.log(updatedAccount);
      return res.status(200).json({ success: true, data: updatedAccount, message: 'Account updated successfully' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

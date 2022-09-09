import { users as sampleUsers } from "./sample";

function authenticate(email, password) {
  const account = sampleUsers.find((a) => a.email === email);
  if (account && account.password === password) {
    return account;
  } else {
    return null;
  }
}

async function getAllBreachesWithAccount(email) {
  const ALL_BREACHES_URL_PREFIX =
    "https://hackcheck.woventeams.com/api/v4/breachedaccount/";
  const HPPT_BAD_REQUEST = 400;
  const HPPT_NOT_FOUND = 404;
  const HPPT_SERVER_ERROR = 500;

  try {
    const response = await fetch(ALL_BREACHES_URL_PREFIX + email);

    if (!response.ok) {
      switch (response.status) {
        case HPPT_NOT_FOUND:
          // no breaches found
          return [];
        case HPPT_BAD_REQUEST:
        case HPPT_SERVER_ERROR:
        default:
          throw new Error(
            `fetch ${ALL_BREACHES_URL_PREFIX + email} HTTP error! status: ${
              response.status
            }`
          );
      }
    } else {
      // some breaches found
      return response.json();
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getValidBreaches(account) {
  const lastLoginDate = new Date(account.lastLogin);
  const allBreaches = await getAllBreachesWithAccount(account.email);

  return allBreaches.filter((breach) => {
    const { IsSensitive, DataClasses, AddedDate } = breach;
    const breachDate = new Date(AddedDate);

    return (
      !IsSensitive &&
      DataClasses.includes("Passwords") &&
      breachDate > lastLoginDate
    );
  });
}

async function login(email, password) {
  const account = authenticate(email, password);
  if (account) {
    const validBreaches = await getValidBreaches(account);
    if (validBreaches.length > 0) {
      // Some new breaches are detected!
      const breachedAccounts = validBreaches.map((breach) => {
        return {
          name: breach.Name,
          domain: breach.Domain,
          breachDate: breach.BreachDate,
          addedDate: breach.AddedDate
        };
      });

      return {
        success: true,
        user: account,
        meta: {
          suggestPasswordChange: true,
          breachedAccounts
        }
      };
    } else {
      // No new breaches found!
      return {
        success: true,
        user: account
      };
    }
  } else {
    return {
      success: false,
      message: "The username or password you entered is invalid."
    };
  }
}

export default login;

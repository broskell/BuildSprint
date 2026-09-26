const user = {
  id: 42,
  firstName: 'Ava',
  lastName: 'Stone',
  email: 'ava@example.com',
  phone: null,
  address: {
    city: 'London',
    country: 'UK',
  },
  account: {
    status: 'inactive',
    plan: 'pro',
  },
};

const getDisplayName = (user) => {
    // const displayNameStr = user.firstName + user.lastName;
    return `${user.firstName} ${user.lastName}`;
}

const getLocation = (user) => {
    return `${user.address.city}, ${user.address.country}`;
}

const getContactSummary = (user) => {
    return {
        email: user.email,
        phone: user.phone
    }
}

const isAccountActive = (user) => {
    return user.account.status === 'active';
}

const createProfileSummary = (user) => {
    const displayName = getDisplayName(user);
    const location = getLocation(user);
    const contact = getContactSummary(user);
    const active = isAccountActive(user);
    const plan = user.account.plan;

    return {
        displayName,
        location,
        contact,
        active,
        plan
    }
}

console.log(createProfileSummary(user));
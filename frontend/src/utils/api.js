const API_URL = 'http://localhost:5001/api';

// Auth API calls
export const register = async (email, password) => {
const response = await fetch(`${API_URL}/auth/register`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({ email, password })
});

const data = await response.json();
if (!response.ok) {
throw new Error(data.msg || 'Registration failed');
}

return data;
};

export const login = async (email, password) => {
const response = await fetch(`${API_URL}/auth/login`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({ email, password })
});

const data = await response.json();
if (!response.ok) {
throw new Error(data.msg || 'Login failed');
}

return data;
};

// Category API calls
export const getCategories = async (token) => {
const response = await fetch(`${API_URL}/categories`, {
headers: {
'x-auth-token': token
}
});

const data = await response.json();
if (!response.ok) {
throw new Error(data.msg || 'Failed to fetch categories');
}

return data;
};

export const createCategory = async (token, name) => {
const response = await fetch(`${API_URL}/categories`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'x-auth-token': token
},
body: JSON.stringify({ name })
});

const data = await response.json();
if (!response.ok) {
throw new Error(data.msg || 'Failed to create category');
}

return data;
};

// Transaction API calls
export const getTransactions = async (token) => {
const response = await fetch(`${API_URL}/transactions`, {
headers: {
'x-auth-token': token
}
});

const data = await response.json();
if (!response.ok) {
throw new Error(data.msg || 'Failed to fetch transactions');
}

return data;
};

export const createTransaction = async (token, transactionData) => {
const response = await fetch(`${API_URL}/transactions`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'x-auth-token': token
},
body: JSON.stringify(transactionData)
});

const data = await response.json();
if (!response.ok) {
throw new Error(data.msg || 'Failed to create transaction');
}

return data;
};

export const getTransactionAnalysis = async (token, startDate, endDate) => {
const response = await fetch(
`${API_URL}/transactions/analysis?startDate=${startDate}&endDate=${endDate}`,
{
headers: {
'x-auth-token': token
}
}
);

const data = await response.json();
if (!response.ok) {
throw new Error(data.msg || 'Failed to fetch transaction analysis');
}

return data;
};

export const deleteCategory = async (token, categoryId) => {
  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': token,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || 'Failed to delete category');
  }

  return data;
};



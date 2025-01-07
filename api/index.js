import { supabase } from "../lib/supabase";

export const getAuthHeaders = async () => {
  const {
    data: {
      session: { access_token },
    },
  } = await supabase.auth.getSession();
  //console.log(access_token);
  return {
    Authorization: `bearer ${access_token}`,
  };
};

// async function getSessionToken() {
//   const user = supabase.auth.getUser();

//   if (user) {
//     const session = await supabase.auth.getSession();
//     console.log(session.access_token);
//     return session?.access_token; // Extract the access token
//   } else {
//     throw new Error("User not authenticated");
//   }
// }

//const token = await getSessionToken();

export const api = {
  post: async (url, body) => {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: getAuthHeaders(),
        // "x-test": "test-value",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    //console.log(response);
    if (!response.ok) {
      throw new Error(response);
    }

    return response.json();
  },

  get: async (url) => {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      // const errorData = await response.json();
      // throw new Error(
      //   errorData.message || "Request failed with status " + response.status,
      // );
      throw new Error(response);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  },

  put: async (url, body) => {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response);
    }
  },

  delete: async (url, body) => {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response);
    }

    return response.json();
  },
};

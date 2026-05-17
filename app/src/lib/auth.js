import { MOCK_USER } from '../data/mockData'

const session = {
  user: MOCK_USER,
}

export const authClient = {
  useSession,
  signIn: { email: signInEmail },
  signUp: { email: signUpEmail },
  signOut,
}

export function useSession() {
  return {
    data: session,
    isPending: false,
    error: null,
  }
}

async function signInEmail(_credentials, callbacks = {}) {
  callbacks.onSuccess?.({ data: session })
  return { data: session, error: null }
}

async function signUpEmail(_credentials, callbacks = {}) {
  callbacks.onSuccess?.({ data: session })
  return { data: session, error: null }
}

export async function signOut(options = {}) {
  options.fetchOptions?.onSuccess?.()
  return { data: null, error: null }
}

export const signIn = authClient.signIn
export const signUp = authClient.signUp

import { createContext, useState } from 'react'

export const FirebaseContext = createContext(null)
export const Authcontext = createContext(null);

export default function Context({ children }) {
    const [user, setUser] = useState(null)
    console.log(user);
    return (
        <Authcontext.Provider value={{ user, setUser }}>
            {children}
        </Authcontext.Provider>
    )
}
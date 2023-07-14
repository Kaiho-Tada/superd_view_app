import { createContext, FC, useEffect, useState } from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {Router} from "./router/Router"
import theme from "./theme/theme";
import { getCurrentUser } from "lib/api/auth";
import { User } from "types/api";

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})
const App: FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async () => {
    setLoading(true)
    try {
      const res = await getCurrentUser()
      console.log(res)

      if (res?.status === 200) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.currentUser)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
          <Router />
        </AuthContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App

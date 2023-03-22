import { getUserAccount } from '@services/accounts-services';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';

export const useAccount = (handleRedirect = true) => {
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [logged, setLogged] = useState(undefined)
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
      if(session?.status === 'loading' && handleRedirect) {
        setLoading(true)
        return
      }
      if(session?.status === 'unauthenticated' && handleRedirect) {
        setLoading(false)
        setLogged(false)
        return router.push('/account/access')
      }

      const getCurrentUser = async () => {
          try {
              const { data: response, status } = await getUserAccount()
              if(status !== 200) return router.push('/account/access')
              
              const { data } = response
              const { account } = data

              setAccount(account)

              setLoading(false)
              setLogged(true)
          } catch (error) {
              console.log(error)
              setLoading(false)
              setLogged(false)
          }
      }
      
      getCurrentUser()
  }, [session])

  return { account, loading, logged }
}
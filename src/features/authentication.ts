import { useMutation, useQueryClient } from "@tanstack/react-query"
import AuthenticationService from "@/api/authentication"
import { LoggedInUser, Login } from "@/types/authentication"
import { GlobalResponse } from "@/types"

export function useLogin() {
  const queryClient = useQueryClient()
  const mutation = useMutation<GlobalResponse<LoggedInUser>, Error, Login>({
    mutationFn: (login: Login) => AuthenticationService.login(login),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] })
      localStorage.setItem("authToken", data.data.token)
    }
  })
  return mutation
}

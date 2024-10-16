import { useState } from "react"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useLocation, useNavigate } from "react-router-dom"
import LoginModal from "@/pages/authentication/login"
import SignUpPanel from "../pages/authentication/sign-up"
import useUser from "@/context/UserContext"
import { User } from "@/types/user"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function NavBar() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser, user } = useUser()

  const navigation: {
    name: string
    href: string
    current: boolean
    isAccessable: boolean
  }[] = [
    { name: "All games", href: "/games/all", current: true, isAccessable: user?.role === "ADMIN" },
    { name: "Games", href: "/games/active", current: false, isAccessable: true },
    {
      name: "My orders",
      href: "/users/me/orders",
      current: false,
      isAccessable: user?.role === "USER"
    },
    { name: "All orders", href: "/orders", current: false, isAccessable: user?.role === "ADMIN" }
  ]

  const openLoginModal = () => setLoginModalOpen(true)
  const closeLoginModal = () => setLoginModalOpen(false)

  const openRegisterModal = () => setRegisterModalOpen(true)
  const closeRegisterModal = () => setRegisterModalOpen(false)

  const handleLogin = (newToken: string, user: User) => {
    localStorage.setItem("authToken", newToken)
    setUser(user)

    if (isLoginModalOpen) {
      closeLoginModal()
    }
  }

  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you'd like to log out?")
    if (userConfirmed) {
      setUser(null)
      localStorage.removeItem("authToken")
      navigate("/games/active")
    }
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Game Logo"
                src="https://avatars.mds.yandex.net/get-shedevrum/12165876/img_01bba63f0d1511ef8431aa83cb71e2b8/orig"
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  if (!item.isAccessable) {
                    return null
                  }
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={location.pathname === item.href ? "page" : undefined}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {localStorage.getItem("authToken") ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <button
                      onClick={() => navigate("/users/me")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={openLoginModal}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
                <button
                  onClick={openRegisterModal}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={location.pathname === item.href ? "page" : undefined}
              className={classNames(
                location.pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={handleLogin} />
      <SignUpPanel
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onRegister={handleLogin}
      />
    </Disclosure>
  )
}

import { Providers } from "./provider"
import { AuthContextProvider } from "./context/AuthContext"
import Navbar from "./UI/navbar"


export const metadata = {
	title: 'Haven Help Center',
}

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<Providers>
					<AuthContextProvider>
						<Navbar />
						{children}
					</AuthContextProvider>
				</Providers>
			</body>
		</html>
	)
}

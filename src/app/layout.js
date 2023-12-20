import { Providers } from "./provider"
import { AuthContextProvider } from "./context/AuthContext"


export const metadata = {
	title: 'Haven Help Center',
}

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<Providers>
						{children}
				</Providers>
			</body>
		</html>
	)
}

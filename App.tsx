import Navigator from './src/navigations/App';

import { AuthProvider } from './src/context';

export default function App() {
	return (
		<AuthProvider>
			<Navigator />
		</AuthProvider>
	);
}

import { createContext, ReactNode, useRef } from "react";
import { WebView } from "react-native-webview";

type WebViewContextType = {
  webviewRef: React.RefObject<WebView | null>; // ✅ null 허용
};

export const WebViewContext = createContext<WebViewContextType>({
  webviewRef: { current: null },
});

export function WebViewProvider({ children }: { children: ReactNode }) {
  const webviewRef = useRef<WebView | null>(null); // ✅ null 허용
  return (
    <WebViewContext.Provider value={{ webviewRef }}>
      {children}
    </WebViewContext.Provider>
  );
}

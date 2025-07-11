import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
//import type { ReactNode } from "react";

type Theme = 'light' | 'dark';

interface ThemeContextType{
    theme: Theme;
    toggleTheme:()=> void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}:{children:ReactNode})=>{
    const [theme, setTheme] = useState<Theme>(()=>{
        return (localStorage.getItem('theme') as Theme) || 'light';
    });

    useEffect(()=>{
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () =>{
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    };

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () =>{
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error ('useTheme must be used within ThemeProvider');
    };
    return context;
};

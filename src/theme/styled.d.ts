import "styled-components/native";
import AppTheme from "./index";
type AppThemeProps = typeof AppTheme;
declare module "styled-components/native" {
  export interface DefaultTheme extends AppThemeProps {}
}

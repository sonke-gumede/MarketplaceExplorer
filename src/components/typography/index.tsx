import AppTheme from "../../theme";
import styled from "styled-components/native";

type textColor = keyof typeof AppTheme.colors;
type weights = keyof typeof AppTheme.fonts.weights;

export const H6 = styled.Text<{ color?: textColor; weight?: weights }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.small,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.black,
  })
);

export const H5 = styled.Text<{ color?: textColor; weight?: weights }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.medium,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.black,
  })
);

export const H4 = styled.Text<{ color?: textColor; weight?: weights }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.large,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.black,
  })
);

export const H3 = styled.Text<{ color?: textColor; weight?: weights }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.xLarge,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.black,
  })
);

export const H2 = styled.Text<{ color?: textColor; weight?: weights }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.xxLarge,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.black,
  })
);

export const H1 = styled.Text<{ color?: textColor; weight?: weights }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.xxxLarge,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.black,
  })
);

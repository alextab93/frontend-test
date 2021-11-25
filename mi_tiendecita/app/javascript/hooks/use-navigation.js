import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

export default function useNavigation() {
  const history = useHistory();

  const navigate = useCallback((route) => history.push(route), [history]);
  const goBack = useCallback(() => history.goBack(), [history]);

  return {
    navigate,
    goBack,
  };
}

import React, { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { InvalidObject } from '@redhat-cloud-services/frontend-components/InvalidObject';
import { Bullseye, Spinner } from '@patternfly/react-core';

const routes = [
  // {
  //   path: '/',
  //   element: InvalidObject,
  // },
  /* Catch all unmatched routes */
  {
    route: {
      path: '*',
    },
    element: InvalidObject,
  },
];

interface RouteType {
  path?: string;
  element: React.ComponentType;
  childRoutes?: RouteType[];
  elementProps?: Record<string, unknown>;
}

const renderRoutes = (routes: RouteType[] = []) =>
  routes.map(({ path, element: Element, childRoutes, elementProps }) => (
    <Route key={path} path={path} element={<Element {...elementProps} />}>
      {renderRoutes(childRoutes)}
    </Route>
  ));

const Routing = () => {
  const renderedRoutes = useMemo(() => renderRoutes(routes), [routes]);
  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <Routes>{renderedRoutes}</Routes>
    </Suspense>
  );
};

export default Routing;

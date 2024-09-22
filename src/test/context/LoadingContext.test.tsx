import { LoadingContext, LoadingProvider } from "@/context/LoadingContext";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { act } from "react";

describe("LoadingProvider", () => {
  test("provides the default loading state", () => {
    const TestComponent = () => {
      const { loading } = useContext(LoadingContext);
      return <div>Loading is {loading ? "true" : "false"}</div>;
    };

    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByText(/Loading is false/i)).toBeInTheDocument();
  });

  test("allows updating the loading state to true", () => {
    const TestComponent = () => {
      const { loading, setLoadingState } = useContext(LoadingContext);
      return (
        <>
          <div>Loading is {loading ? "true" : "false"}</div>
          <button onClick={() => setLoadingState(true)}>
            Set Loading to True
          </button>
        </>
      );
    };

    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByText(/Loading is false/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText(/Set Loading to True/i));
    });

    expect(screen.getByText(/Loading is true/i)).toBeInTheDocument();
  });

  test("allows updating the loading state to false", () => {
    const TestComponent = () => {
      const { loading, setLoadingState } = useContext(LoadingContext);
      return (
        <>
          <div>Loading is {loading ? "true" : "false"}</div>
          <button onClick={() => setLoadingState(true)}>
            Set Loading to True
          </button>
          <button onClick={() => setLoadingState(false)}>
            Set Loading to False
          </button>
        </>
      );
    };

    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    // Primero, configura el loading a true
    act(() => {
      fireEvent.click(screen.getByText(/Set Loading to True/i));
    });

    expect(screen.getByText(/Loading is true/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText(/Set Loading to False/i));
    });

    expect(screen.getByText(/Loading is false/i)).toBeInTheDocument();
  });

  test("throws error when setLoadingState is called outside of LoadingProvider", () => {
    const TestComponent = () => {
      const { setLoadingState } = useContext(LoadingContext);

      // Llamamos a setLoadingState sin un LoadingProvider
      setLoadingState(true);
      return null;
    };

    // Esperamos que renderizar el componente sin el LoadingProvider lance el error
    expect(() => render(<TestComponent />)).toThrowError(
      "setLoadingState debe ser utilizado dentro de un LoadingProvider"
    );
  });
});

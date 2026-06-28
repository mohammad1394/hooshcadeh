// src/components/errorboundary/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-gray-500 text-sm">مشکلی پیش آمد</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-3 text-xs text-blue-500 hover:underline"
                    >
                        تلاش مجدد
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
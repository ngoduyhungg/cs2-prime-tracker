function formatUsd(value: number | null | undefined) {
    if (value === null || value === undefined) {
        return "—";
    }

    return `$${value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
    })}`;
}

export { formatUsd };
interface Range {
    min: number;
    max: number;
}

function mapRange(
    in_min: number,
    in_max: number,
    input: number,
    out_min: number,
    out_max: number
): number {
    return ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

const Maths = { mapRange }

export { mapRange }
export default Maths
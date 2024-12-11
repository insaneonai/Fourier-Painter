function dft(signal){
    let X = [];
    const N = signal.length;

    for (let k=0; k<N; k++){
        let re = 0;
        let im = 0;
        for (let n=0; n<N; n++){
            let theta = (TWO_PI * k * n) / N;
            re += signal[n] * cos(theta);
            im -= signal[n] * sin(theta);
        }

        re = re / N;
        im = im / N;

        let freq = k;
        let amplitude = sqrt(re ** 2 + im ** 2);
        let phase = atan2(im, re);

        X[k] = {re, im, freq, amplitude, phase};
    }

    return X;
}
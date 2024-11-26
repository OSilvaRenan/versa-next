import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

interface ScannerProps {
    onDetected: (code: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
    const scannerRef = useRef<HTMLDivElement>(null);

    function count_order_ocorrencias(array: string[]): string[] {
        // Step 1: Count occurrences
        const counts: { [key: string]: number } = array.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        // Step 2: Convert to array of [element, count] pairs
        const sortedArray = Object.entries(counts)
            // Step 3: Sort by count
            .sort((a, b) => b[1] - a[1])
            // Step 4: Flatten the array
            .flatMap(([item, count]) => Array(count).fill(item));
        return sortedArray;
    }

    useEffect(() => {
        if (scannerRef.current) {
            Quagga.init({
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        width: { min: 640 },
                        height: { min: 480 },
                        facingMode: "environment", // Use a câmera traseira
                        aspectRatio: { min: 1, max: 2 } // Mantém a proporção da imagem
                    },
                    target: scannerRef.current,
                    numOfWorkers: navigator.hardwareConcurrency, // Aumenta o número de trabalhadores para processamento paralelo
                },
                locator: {
                    patchSize: "large", // Aumenta o tamanho dos blocos para melhorar a precisão
                    halfSample: false // Usa metade dos pixels para melhorar o desempenho
                },
                frequency: 5, // Processa a cada 10 milissegundos
                decoder: {
                    readers: [
                        "ean_reader",
                        "ean_8_reader",
                        "code_128_reader",
                        "code_39_reader",
                        "code_39_vin_reader",
                        "codabar_reader",
                        "upc_reader",
                        "upc_e_reader",
                        "i2of5_reader"
                    ]
                },
                locate: true // Habilita a localização automática dos códigos na imagem
            }, (err: any) => {
                if (err) {
                    console.log(err, "error msg");
                    return;
                }
                Quagga.start();
            });

            Quagga.onProcessed((result: any) => {
                const drawingCtx = Quagga.canvas.ctx.overlay;
                const drawingCanvas = Quagga.canvas.dom.overlay;

                if (result) {
                    if (result.boxes) {
                        drawingCtx.clearRect(
                            0,
                            0,
                            Number(drawingCanvas.getAttribute("width")),
                            Number(drawingCanvas.getAttribute("height"))
                        );
                        result.boxes
                            .filter((box: any) => box !== result.box)
                            .forEach((box: any) => {
                                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                                    color: "green",
                                    lineWidth: 2
                                });
                            });
                    }
                    if (result.box) {
                        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                            color: "#00F",
                            lineWidth: 2
                        });
                    }
                    if (result.codeResult && result.codeResult.code) {
                        Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, {
                            color: "red",
                            lineWidth: 3
                        });
                    }
                }
            });

            Quagga.onDetected(detected);
        }

        return () => {
            Quagga.stop();
            Quagga.offDetected();
        };
    }, [onDetected]);

    let lstResultado: string[] = [];

    const detected = (result: any) => {

        lstResultado.push(result.codeResult.code);

        if (lstResultado.length > 20) {
            let code = count_order_ocorrencias(lstResultado)[0];
            lstResultado = [];
            onDetected(code);
        }
    };

    return (
        <div ref={scannerRef} style={{ width: '100%', height: '300px', position: 'relative' }}>
            <video style={{ width: '100%', height: '100%' }} />
            <canvas className="drawingBuffer" style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }} />
        </div>
    );
};

export default Scanner;

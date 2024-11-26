import React, { useEffect } from "react";
import Quagga from "quagga";

interface ScannerProps {
  onDetected: (code: string) => void;
}

const Scanner = ({ onDetected }: ScannerProps) => {

  useEffect(() => {
    Quagga.init({
      inputStream: {
          type: 'LiveStream',
          constraints: {
              width: { "min": 450 },
              height: { "min": 300 },
              facingMode: "environment",
              aspectRatio: { "min": 1, "max": 2 }
          },
      },
      locator: {
          patchSize: "medium",
          halfSample: true
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
          readers: [
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'code_39_reader',
              'code_39_vin_reader',
              'codabar_reader',
              'upc_reader',
              'upc_e_reader'
          ]
      },
      locate: true
  }, (err: any) => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });

    //detecting boxes on stream
    Quagga.onProcessed((result: { boxes: any[]; box: any; codeResult: { code: any; }; line: any; }) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
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
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = (result: any) => {
    onDetected(result.codeResult.code);
  };

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;

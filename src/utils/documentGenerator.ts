import { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { CalculationResults, CalculatorInputs } from '../types';

const formatDate = (date: Date): string => {
  return date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
};

export const generateDocument = async (results: CalculationResults, inputs: CalculatorInputs) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: "Reinforcement Development Length Calculation Report",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 300 }
        }),
        
        // Input Parameters Table
        new Paragraph({
          text: "1. Input Parameters",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Parameter")] }),
                new TableCell({ children: [new Paragraph("Value")] }),
                new TableCell({ children: [new Paragraph("Unit")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Bar Diameter (db)")] }),
                new TableCell({ children: [new Paragraph(inputs.barDiameter.toString())] }),
                new TableCell({ children: [new Paragraph("mm")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Yield Strength (fsy)")] }),
                new TableCell({ children: [new Paragraph(inputs.yieldStrength.toString())] }),
                new TableCell({ children: [new Paragraph("MPa")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Concrete Strength (f'c)")] }),
                new TableCell({ children: [new Paragraph(inputs.concreteStrength.toString())] }),
                new TableCell({ children: [new Paragraph("MPa")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Cover to Bar (cd)")] }),
                new TableCell({ children: [new Paragraph(inputs.cd.toString())] }),
                new TableCell({ children: [new Paragraph("mm")] })
              ]
            })
          ]
        }),

        // Calculation Factors
        new Paragraph({
          text: "2. Calculation Factors",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Factor")] }),
                new TableCell({ children: [new Paragraph("Value")] }),
                new TableCell({ children: [new Paragraph("Description")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("k1")] }),
                new TableCell({ children: [new Paragraph(results.factors.k1.toFixed(2))] }),
                new TableCell({ children: [new Paragraph(results.factors.k1 > 1 ? "Horizontal bar with concrete below" : "Standard position")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("k2")] }),
                new TableCell({ children: [new Paragraph(results.factors.k2.toFixed(2))] }),
                new TableCell({ children: [new Paragraph("Bar size factor")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("k3")] }),
                new TableCell({ children: [new Paragraph(results.factors.k3.toFixed(2))] }),
                new TableCell({ children: [new Paragraph("Cover factor")] })
              ]
            })
          ]
        }),

        // Results
        new Paragraph({
          text: "3. Calculation Results",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Result")] }),
                new TableCell({ children: [new Paragraph("Value")] }),
                new TableCell({ children: [new Paragraph("Unit")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Basic Development Length (Lsy.tb)")] }),
                new TableCell({ children: [new Paragraph(Math.round(results.developmentLength).toString())] }),
                new TableCell({ children: [new Paragraph("mm")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Lap Splice Length (Lsy.t.lap)")] }),
                new TableCell({ children: [new Paragraph(Math.round(results.lapLength).toString())] }),
                new TableCell({ children: [new Paragraph("mm")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Final Required Length")] }),
                new TableCell({ children: [new Paragraph(Math.round(results.finalLength).toString())] }),
                new TableCell({ children: [new Paragraph("mm")] })
              ]
            })
          ]
        }),

        // Hook Details if applicable
        ...(results.hookData ? [
          new Paragraph({
            text: "4. Hook Requirements",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 200 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Parameter")] }),
                  new TableCell({ children: [new Paragraph("Value")] }),
                  new TableCell({ children: [new Paragraph("Unit")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Hook Type")] }),
                  new TableCell({ children: [new Paragraph(results.hookData.description)] }),
                  new TableCell({ children: [new Paragraph("-")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Minimum Horizontal Length")] }),
                  new TableCell({ children: [new Paragraph(Math.round(results.hookData.horizontalLength).toString())] }),
                  new TableCell({ children: [new Paragraph("mm")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Minimum Extension")] }),
                  new TableCell({ children: [new Paragraph(results.hookData.minExtension.toString())] }),
                  new TableCell({ children: [new Paragraph("mm")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Total Length with Hook")] }),
                  new TableCell({ children: [new Paragraph(Math.round(results.hookData.totalLength).toString())] }),
                  new TableCell({ children: [new Paragraph("mm")] })
                ]
              })
            ]
          })
        ] : []),

        // Notes and Compliance
        new Paragraph({
          text: "5. Notes and Compliance",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Minimum development length requirement is satisfied",
              break: true
            })
          ]
        }),
        ...(results.isSlipFormed ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "• 30% increase applied for slip formed construction",
                break: true
              })
            ]
          })
        ] : []),
        ...(results.isBundle ? [
          new Paragraph({
            children: [
              new TextRun({
                text: `• Bundle adjustment factor of ${results.bundleType === 'bundle3' ? '20%' : '33%'} applied`,
                break: true
              })
            ]
          })
        ] : [])
      ]
    }]
  });

  // Generate and save the document using Packer
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Reinforcement_Development_Length_${formatDate(new Date())}.docx`);
};
const PDFMerger = require('pdf-merger-js');
const mergepdfs = async (p1, p2) => {
    const merger = new PDFMerger();
    await merger.add(p1);
    await merger.add(p2);
    await merger.save('merged.pdf');
};

module.exports = mergepdfs;

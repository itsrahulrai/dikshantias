'use client';

import React from 'react';

const OrderedListArrowCards: React.FC = () => {
  return (
    <div className="px-2 py-6 md:px-8 mb-7 -mt-14 md:mt-3">
      <div className="max-w-7xl mx-auto bg-slate-100 p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-[#00072c] mb-6 text-center md:text-left">
          2 August 2025 – What to Read in The Hindu
        </h1>

        <ol className="list-decimal list-inside space-y-3 text-blue-950 text-base md:text-lg">
          <li>
            Trump unveils slew of new tariffs on nearly 70 nations; Canada faces punitive levy – Page 1 – The Hindu – GS2 (IR)
          </li>
          <li>
            India-U.S. ties have ‘weathered several challenges’: MEA – Page 1 – The Hindu – GS2 (IR)
          </li>
          <li>
            India’s fuel exports continue without import duty to U.S. – Page 1 – The Hindu – GS3 (Economy)
          </li>
          <li>
            SC lets withdrawal of plea to bring parties under POSH Act – Page 3 – The Hindu – GS2 (Governance)
          </li>
          <li>
            National Film Awards – Page 5 – The Hindu – Miscellaneous
          </li>
          <li>
            ‘Report on failure analysis of PSLV-C61/EOS-09 mission to be submitted to PM soon’ – Page 5 – The Hindu – GS3 (Space)
          </li>
          <li>
            ISRO gearing up for next U.S. collaboration with BlueBird communications satellite – Page 5 – The Hindu – GS3 (Space)
          </li>
          <li>
            What has been missed is India’s digital sovereignty – Page 6 – The Hindu – GS2 (Governance)
          </li>
          <li>
            The fact is mangroves drive business – Page 6 – The Hindu – GS3 (Environment)
          </li>
          <li>
            Cane cultivation area increases by a tad – Page 11 – The Hindu – GS3 (Environment)
          </li>
          <li>
            Mount Lewotobi Laki-Laki – Page 12 – The Hindu – GS1 (Geography)
          </li>
          <li>
            What are all these microplastics doing to our brains – Page 13 – The Hindu – GS3 (Environment)
          </li>
        </ol>
      </div>
    </div>
  );
};

export default OrderedListArrowCards;

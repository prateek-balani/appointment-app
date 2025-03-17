
import { TextEncoder, TextDecoder } from 'util';

import "@testing-library/jest-dom"; // Extends jest with DOM-related assertions

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

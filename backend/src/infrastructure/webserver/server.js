const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('../../config');

import PrismaAlbumRepository from '../repositories/prisma/PrismaAlbumRepository';
import PrismaUserRepository from '../repositories/prisma/PrismaUserRepository';
import PrismaTrackRepository from '../repositories/prisma/PrismaTrackRepository';

import bcrypthaashser from '../services/bcryptHasher';
import CloudinaryService from '../services/cloudinaryService';
import JwTokenService from '../services/JwTokenService';


import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBooksService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        price: 12,
        description: 'desc',
        genreId: '1',
      };
      const expectedResult = { id: '1', ...createBookDto };
      
      mockBooksService.create.mockResolvedValue(expectedResult);
      
      const result = await controller.create(createBookDto);
      
      expect(service.create).toHaveBeenCalledWith(createBookDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('getAll', () => {
    it('should return all books', async () => {
      const expectedBooks = [
        { id: '1', title: 'Book 1' },
        { id: '2', title: 'Book 2' },
      ];
      
      mockBooksService.getAll.mockResolvedValue(expectedBooks);
      
      const result = await controller.getAll();
      
      expect(service.getAll).toHaveBeenCalled();
      expect(result).toBe(expectedBooks);
    });
  });

  describe('getById', () => {
    it('should return a book by id', async () => {
      const bookId = '1';
      const expectedBook = { id: bookId, title: 'Test Book' };
      
      mockBooksService.getById.mockResolvedValue(expectedBook);
      
      const result = await controller.getById(bookId);
      
      expect(service.getById).toHaveBeenCalledWith(bookId);
      expect(result).toBe(expectedBook);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const bookId = '1';
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        // Add other properties based on your DTO
      };
      const expectedResult = { id: bookId, ...updateBookDto };
      
      mockBooksService.update.mockResolvedValue(expectedResult);
      
      const result = await controller.update(bookId, updateBookDto);
      
      expect(service.update).toHaveBeenCalledWith(bookId, updateBookDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      const bookId = '1';
      const expectedResult = { deleted: true };
      
      mockBooksService.delete.mockResolvedValue(expectedResult);
      
      const result = await controller.delete(bookId);
      
      expect(service.delete).toHaveBeenCalledWith(bookId);
      expect(result).toBe(expectedResult);
    });
  });
});
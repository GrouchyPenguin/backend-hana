import { IsInt, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  public name: string;

  @IsString()
  public content: string;

  @IsString()
  public user: string;

  @IsInt()
  public resX: number;

  @IsInt()
  public resY: number;

  @IsInt()
  public size: number;

  @IsInt()
  public length: number;
}

export class ImportYoutubeVideosDto {
  public videoData: CreateVideoDto[];
}

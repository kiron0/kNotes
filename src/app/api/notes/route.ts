import { connect } from "@/server/configs/config.db";
import { Note } from "@/server/models/note.model";
import { SendResponse } from "@/server/utils/SendResponse";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
          await connect();

          const params = new URL(req.url);
          const page = Number(params.searchParams.get('page')) || 1;
          const limit = Number(params.searchParams.get('limit')) || 10;
          const skip = (page - 1) * limit;

          const notes = await Note.find({}).skip(skip).limit(limit);

          return SendResponse({
                    statusCode: httpStatus.OK,
                    success: true,
                    message: "Notes fetched successfully",
                    data: {
                              meta: {
                                        page,
                                        limit,
                                        total: notes.length,
                              },
                              notes,
                    },
          });
}

export async function POST(req: NextRequest, res: NextResponse) {
          await connect();

          const { title, description } = await req.json();

          if (!title || !description) {
                    return SendResponse({
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: "Title and description are required",
                    });
          }

          try {
                    const existingNote = await Note.findOne({ title, description });

                    if (existingNote) {
                              return SendResponse({
                                        statusCode: httpStatus.OK,
                                        success: true,
                                        message: "Note updated successfully",
                                        data: {
                                                  id: existingNote._id,
                                        },
                              });
                    } else {
                              const titleWordsCount = title.split(" ").length;
                              const titleCharactersCount = title.length;
                              const desWordsCount = description.split(" ").length;
                              const desCharactersCount = description.length;

                              const finalData = {
                                        title,
                                        description,
                                        titleWordsCount,
                                        titleCharactersCount,
                                        desWordsCount,
                                        desCharactersCount,
                              };

                              const note = await Note.create(finalData);


                              return SendResponse({
                                        statusCode: httpStatus.CREATED,
                                        success: true,
                                        message: "Note created successfully",
                                        data: {
                                                  id: note._id,
                                        },
                              });
                    }
          } catch (error) {
                    return NextResponse.json(error);
          }
}
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.Rating;
import entity.User;
import java.util.List;

/**
 *
 * @author danni
 */
public interface IratingFacade{
    public List<Rating> getSingleRating(Long id);
    public void setSingleRating(Rating rating, User user);
}
